export default class ToastManager {
    constructor() {
        this.notifications = document.querySelector(".notifications");
        this.toastDetails = {
            timer: 3000,
            success: {
                icon: 'fa-circle-check',
                text: 'Success: This is a success toast.',
            },
            error: {
                icon: 'fa-circle-xmark',
                text: 'Error: This is an error toast.',
            },
            warning: {
                icon: 'fa-triangle-exclamation',
                text: 'Warning: This is a warning toast.',
            },
            info: {
                icon: 'fa-circle-info',
                text: 'Info: This is an information toast.',
            }
        };
    }

    removeToast(toast) {
        toast.classList.add("hide");
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        setTimeout(() => toast.remove(), 500);
    }

    createToast(id, msg) {
        const { icon, text } = this.toastDetails[id];
        if (!msg) msg = text;
        const toast = document.createElement("li");
        toast.className = `toast ${id}`;
        toast.innerHTML = `<div class="column">
                            <i class="fa-solid ${icon}"></i>
                            <span>${msg}</span>
                          </div>
                          <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        this.notifications.appendChild(toast);
        toast.timeoutId = setTimeout(() => this.removeToast(toast), this.toastDetails.timer);
    }

    createToastInRedirectedPage(id, msg, redirectedPage) {
        localStorage.setItem('toastId', JSON.stringify({id: id, msg:msg}));
        window.location.href = redirectedPage;
    }

    displayToast() {
        const data = localStorage.getItem('toastId');
        if (!data) return;
        const toastId = JSON.parse(data);
        if(toastId.id) this.createToast(toastId.id, toastId.msg);
        localStorage.removeItem('toastId');
    }
}
