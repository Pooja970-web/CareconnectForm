document.addEventListener('DOMContentLoaded', () => {

    /* --- Contact Form Handling --- */
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop actual submission

        const name = document.getElementById('name').value;
        const issue = document.getElementById('issue').value;

        // Simulate sending data (Client-side only)
        formResponse.textContent = `Thank you, ${name}! We have received your query regarding "${issue}". A support agent will contact you shortly.`;
        formResponse.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formResponse.classList.add('hidden');
        }, 5000);
    });


    /* --- Chatbot Logic --- */
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatWindow = document.getElementById('chatWindow');

    const botResponses = {
        "hours": "We are open Monday to Friday, 9 AM to 6 PM.",
        "time": "We are open Monday to Friday, 9 AM to 6 PM.",
        "location": "We are located at 123 Health St, Wellness City.",
        "address": "We are located at 123 Health St, Wellness City.",
        "appointment": "To book an appointment, please call us at (555) 123-4567 or use the form on the left.",
        "book": "To book an appointment, please call us at (555) 123-4567 or use the form on the left.",
        "emergency": "For medical emergencies, please call 911 immediately.",
        "help": "I can tell you about our hours, location, or how to book an appointment.",
        "hello": "Hello! How can I help you today?",
        "hi": "Hi there! How can I assist you?"
    };

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
        div.textContent = text;
        chatWindow.appendChild(div);
        
        // Auto-scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getBotResponse(input) {
        input = input.toLowerCase();
        
        // Simple keyword matching
        for (const key in botResponses) {
            if (input.includes(key)) {
                return botResponses[key];
            }
        }
        
        return "I'm sorry, I didn't quite understand that. You can ask about our hours, location, or appointments.";
    }

    function handleChat() {
        const text = userInput.value.trim();
        if (text === "") return;

        // User message
        addMessage(text, 'user');
        userInput.value = '';

        // Bot response delay simulation
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 500);
    }

    sendBtn.addEventListener('click', handleChat);

    // Allow pressing Enter to send
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

});
