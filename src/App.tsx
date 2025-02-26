import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
//import "./index.css"
const API_KEY = import.meta.env.VITE_API_KEY;

interface Message {
  message: string;
  sender: "user" | "ChatGPT";
  timestamp: string; // Ajout pour la date et l'heure
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Bonjour, je suis AwaBot ! Pose-moi des questions médicales. 😊",
      sender: "ChatGPT",
      timestamp: `${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      message: inputMessage,
      sender: "user",
      timestamp: `${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputMessage("");

    setIsTyping(true);
    const detectedIntent = detectIntent(inputMessage);
    if (detectedIntent) {
      console.log("Intent détecté :", detectedIntent);
      // Tu peux ajuster la réponse en fonction de l'intent détecté, si nécessaire
    }
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    }));

     // Ajout de l'intent dans le message système
    const detectedIntent = detectIntent(chatMessages[chatMessages.length - 1].message);
    const systemMessage = detectedIntent ? {
      role: "system",
      content: `Tu es un assistant médical. L'intention actuelle est: ${detectedIntent}. Réponds aux questions de manière claire et concise en français.N'utilise pas de langage technique inutile et va directement à l'essentiel.`
    } : {
      role: "system",
      content:"Tu es un assistant médical intelligent nommé AwaBot. Réponds de manière claire et concise à des questions médicales en français. Inclut des émoticônes (😊, 🩺, 💊) et structure tes réponses avec des sauts de ligne si nécessaire.",

    };

    const apiRequestBody = {
      model: "deepseek-r1-distill-llama-70b", // Utilisez le modèle approprié
      messages: [systemMessage, ...apiMessages],
      temperature: 0.5,
    };

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setMessages([
          ...chatMessages,
          {
            message: formatResponse(data.choices[0].message.content),
            sender: "ChatGPT",
            timestamp: `${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
          },
        ]);
      } else {
        setMessages([
          ...chatMessages,
          {
            message: "Désolé, je n'ai pas pu comprendre votre question. 😔",
            sender: "ChatGPT",
            timestamp: `${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
      setMessages([
        ...chatMessages,
        {
          message: "Une erreur est survenue. Veuillez réessayer. 😔",
          sender: "ChatGPT",
          timestamp: `${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }
  function detectIntent(message:string) {
    const intents = [
    { intent: "Prise de rendez-vous", keywords: ["prendre rendez-vous", "rendez-vous", "disponibilité", "horaire"] },
    { intent: "Symptômes", keywords: ["symptômes", "douleur", "fièvre", "mal de tête"] },
    { intent: "Médicaments", keywords: ["médicament", "traitement", "pilule", "remède"] },
    { intent: "Vaccination", keywords: ["vaccination", "vacciner", "vaccin", "dose"] },
    { intent: "Allergies", keywords: ["allergie", "réaction allergique", "sensibilité"] },
    { intent: "Consultation à distance", keywords: ["téléconsultation", "consultation vidéo", "consultation à distance"] },
    { intent: "Santé mentale", keywords: ["stress", "anxiété", "dépression", "bien-être mental"] },
    { intent: "Examens médicaux", keywords: ["examen médical", "analyse", "test", "bilan de santé"] },
    { intent: "Conseils de prévention", keywords: ["prévention", "éviter", "conseils santé", "hygiène"] },
    { intent: "Traitement", keywords: ["soins", "traitement", "guérir", "remède"] }
    ];
    
    for (let i = 0; i < intents.length; i++) {
    for (let j = 0; j < intents[i].keywords.length; j++) {
    if (message.toLowerCase().includes(intents[i].keywords[j])) {
    return intents[i].intent;
    }
    }
    }
    return null; // Aucun intent détecté
    }

  function formatResponse(responseText: string): string {
    return responseText
    .replace(/<think>[\s\S]*?<\/think>\n*/g, "")
    .trim()
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\\n\\n/g, "\n\n")
    .replace(/\\n/g, "\n")  
    .replace(/(:\))/g, "😊") // Remplacement des smileys texte par des emojis
    
  }
 
  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "800px",
           // border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <ChatWindow messages={messages} isTyping={isTyping} />
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSend={handleSend}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
