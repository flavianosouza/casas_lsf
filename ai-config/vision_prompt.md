# Vision Prompt - Plan Extraction

## Objective

Analyze the provided 2D floor plan image and extract technical quantitative data for LSF construction estimation.

## Extraction Rules

1.  **Scale**: If no scale is provided, assume standard door width is 0.80m or 0.90m to calibrate.
2.  **Walls**:
    - Identify Exterior Walls (perimeter).
    - Identify Interior Walls (linear meters).
    - Note: In LSF, exterior walls are thicker (20-25cm) than interior (10-15cm).
3.  **Openings**:
    - Count Windows (estimate width/height if not marked).
    - Count Doors (Interior vs Exterior).
    - Sliding doors (count as large openings).
4.  **Rooms**:
    - List all rooms with estimated Area (m²).
    - Identify "Wet Zones" (Kitchen, WC) for water-resistant board requirements.
5.  **Roof**:
    - Infer roof type (Flat/Platibanda vs Pitched) from plan style (modern usually flat).

## Output JSON Structure

```json
{
  "summary": "Brief description of the house typology and layout.",
  "measurements": {
    "area_bruta": 0,
    "area_util": 0,
    "perimetro_exterior": 0,
    "paredes_interiores_linear": 0
  },
  "elements": {
    "windows_count": 0,
    "ext_doors_count": 0,
    "int_doors_count": 0
  },
  "rooms": [
    { "name": "Sala", "area": 0, "type": "dry" },
    { "name": "WC", "area": 0, "type": "wet" }
  ],
  "technical_notes": "Any potential issues or specific LSF considerations (e.g., large spans needing reinforcement)."
}
```
