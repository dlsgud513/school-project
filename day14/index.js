export default async function main() {

    const inpMsg = document.querySelector("inputMessage");
    const btnSend = document.querySelector("sendButton");
    const txtResponse = document.querySelector("responseText");

    btnSend.addEventListener("click", async () => {
    console.log("msg : ");
    })

    const MODEL = "qwen3-vl:2b";
  const OLLAMA_URL = "http://localhost:11434/api/chat";

  // Ollama 요청 함수
  async function callOllama(promptText, userText) {
    const body = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: promptText || "You are a helpful assistant."
        },
        {
          role: "user",
          content: userText
        }
      ],
      stream: false
    };

    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Ollama Error: ${res.status} / ${text}`);
    }

    const data = await res.json();
    return data.message.content;
  }


    console.log("Hello, Day 14!");
}