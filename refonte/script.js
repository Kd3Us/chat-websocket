const socket = io("http://localhost:5000")

document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById("messages")
    const messageInput = document.getElementById("messageInput")

    socket.on("message", (data) => {
        const p = document.createElement("p")
        p.textContent = data
        messagesDiv.appendChild(p)
    })

    window.sendMessage = () => {
        const message = messageInput.ariaValueMax.trim()
        if (message) {
            socket.emit("message", message)
            messageInput.value = ""
        }
    }
})

