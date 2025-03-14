const button = document.querySelector("button")

button.addEventListener('click', () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            const notification = new Notification("Example notification", {
                body: Math.random(),
                data: { hello: "world"},
                //icon: "Logo Centered.png",
                tag: "Welcome Message",
            })

            notification.addEventListener("error", e => {
                alert("error");
                
            })
        }
    })
})


let notification
let interval
document.addEventListener("visibilitychange", () => {
    if(document.visibilityState === "hidden") {
        setInterval(() => {
            notification = new Notification("Come back please", {
                body: `You have been gone for ${Math.round(
                    (new Date() - leaveDate) / 1000
                )} seconds`,
                tag: "Come Back",
            })
        }, 100)
        
    } else {
        if (interval) clearInterval(interval)
        if (notification) notification.close()
    }
})