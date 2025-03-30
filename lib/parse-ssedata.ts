import { SSEEventData } from "@/types/sseevent";

export function parseSSEData(lines: string[]): SSEEventData {
  const dataLines = lines.filter(line => line.startsWith('data:'));
  const combinedData = dataLines.map(line => line.slice(5)).join('\n');
  
  try {
    const firstBrace = combinedData.indexOf('{');
    const lastBrace = combinedData.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error('Invalid JSON structure');
    }
    
    const jsonContent = combinedData.slice(firstBrace, lastBrace + 1);
    
    const parsedData = JSON.parse(jsonContent) as SSEEventData;
    
    if (typeof parsedData.data === 'string') {
      parsedData.data = parsedData.data
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t');
    }
    
    return parsedData;
  } catch (error) {
    console.error('SSE Parsing Error:', error);
    return {
      success: false,
      message: 'Parsing error',
      data: combinedData,
      hash: '',
      author: '',
      tx_id: ''
    };
  }
}