import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as xlsx from "xlsx";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  
  // 1. BOM Integrity Check & Conversion
  app.post("/api/bom/process", (req, res) => {
    try {
      const { data } = req.body; // Array of part objects
      
      // Simulated Integrity Check
      // Rule: Quantity must be positive, Part Number must be present
      const issues = [];
      data.forEach((item: any, index: number) => {
        if (!item.partNumber) issues.push(`Row ${index + 1}: Missing Part Number`);
        if (item.quantity <= 0) issues.push(`Part ${item.partNumber}: Invalid quantity (${item.quantity})`);
        if (!item.material) issues.push(`Part ${item.partNumber}: Missing material specification`);
      });

      // Simulated ERP Mapping
      const erpBOM = data.map((item: any) => ({
        "ERP_PART_ID": item.partNumber,
        "REQ_QTY": item.quantity,
        "MAT_SPEC": item.material || "N/A",
        "UNIT_WT": item.weight || 0,
        "VERSION": "1.0",
        "STATUS": "READY"
      }));

      res.json({
        success: true,
        issues,
        erpBOM,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 2. Drawing Audit (Intelligence)
  app.post("/api/audit/drawing", async (req, res) => {
    try {
      const { textContent, rules } = req.body;

      const prompt = `
        Analyze the following technical drawing annotations/metadata and check against the provided design rules.
        Identify any violations, missing tolerances, or non-compliance with standards.
        
        Drawing Content:
        ${textContent}
        
        Rules:
        ${rules || "Default: Check for missing tolerances, material specs, and standard title block info."}
        
        Output format: JSON array of objects with { type: "Error" | "Warning", message: string, section: string }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                message: { type: Type.STRING },
                section: { type: Type.STRING }
              },
              required: ["type", "message", "section"]
            }
          }
        }
      });

      res.json({ results: JSON.parse(response.text || "[]") });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // 3. Standard Part Generator Metadata
  app.post("/api/parts/generate", (req, res) => {
    const { type, params } = req.body;
    
    // Auto-Naming Rule
    const partName = `ADIS-${type.toUpperCase()}-${params.size}-${params.length || 'STD'}`;
    
    res.json({
      partName,
      spec: {
        ...params,
        generatedAt: new Date().toISOString(),
        author: "ADIS Generator"
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
