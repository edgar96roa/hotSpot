import Swal from 'sweetalert2';

export const showAlertWindow = () => {
    Swal.fire({
        title: 'Redimensionando...',
        text: 'Redimensionando zona de respuesta',
        icon: 'warning',
        showConfirmButton: true,
        timer: '2200',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 2200)
        },
        willClose: () => {
            clearInterval(2200)
        }
    });
}