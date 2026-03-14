package com.example.demo.Ai;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final Client geminiClient;

    public AiService(@Value("${gemini.api.key}") String apiKey) {
        System.setProperty("GOOGLE_API_KEY", apiKey);
        this.geminiClient = new Client(); // default safe client
    }

    private String generate(String prompt) {
        GenerateContentResponse response = geminiClient.models.generateContent(
                "models/text-bison-001",
                prompt,
                null
        );
        return response.text().trim();
    }

    // Simple chat method
    public String chat(String userMessage) {
        String prompt = """
            You are a helpful AI assistant.
            Answer the following question clearly:

            "%s"
            """.formatted(userMessage);

        return generate(prompt);
    }
}