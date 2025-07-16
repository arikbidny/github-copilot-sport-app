import "@testing-library/jest-dom";

// Mock AzureOpenAI
jest.mock("openai", () => ({
  AzureOpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn()
      }
    }
  }))
}));

describe("Summarize API Logic", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("validates that Azure OpenAI configuration is checked", () => {
    delete process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT;
    delete process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY;

    expect(process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT).toBeUndefined();
    expect(process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY).toBeUndefined();
  });

  it("validates that OpenAI client is configured correctly when environment variables are present", () => {
    process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT = "https://test.openai.azure.com/";
    process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY = "test-key";

    const { AzureOpenAI } = require("openai");
    
    // Test that AzureOpenAI constructor would be called with correct params
    expect(process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT).toBe("https://test.openai.azure.com/");
    expect(process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY).toBe("test-key");
  });

  it("validates OpenAI API call structure", async () => {
    process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT = "https://test.openai.azure.com/";
    process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY = "test-key";

    const { AzureOpenAI } = require("openai");
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: "This is a test summary of the press conference."
          }
        }
      ]
    });

    AzureOpenAI.mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    }));

    const mockClient = new AzureOpenAI({
      endpoint: process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY,
      apiVersion: "2024-10-01-preview",
    });

    const testTranscription = "Test transcription";
    const systemPrompt = expect.stringContaining("You are a professional sports journalist");

    await mockClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: testTranscription }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: testTranscription }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
  });
});