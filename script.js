/**
 * Validação e manipulação do formulário de login
 */

class LoginValidator {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.successMessage = document.getElementById('successMessage');
        this.rememberMe = document.getElementById('rememberMe');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));

        this.loadSavedEmail();
    }

    /**
     * Valida o formato do email
     */
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError('email', 'E-mail é obrigatório');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.showError('email', 'E-mail inválido');
            return false;
        }

        this.clearError('email');
        return true;
    }

    /**
     * Valida a senha
     */
    validatePassword() {
        const password = this.passwordInput.value;

        if (!password) {
            this.showError('password', 'Senha é obrigatória');
            return false;
        }

        if (password.length < 6) {
            this.showError('password', 'Senha deve ter no mínimo 6 caracteres');
            return false;
        }

        this.clearError('password');
        return true;
    }

    /**
     * Exibe mensagem de erro
     */
    showError(field, message) {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     * Limpa mensagem de erro
     */
    clearError(field) {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    /**
     * Limpa mensagem de sucesso
     */
    clearSuccess() {
        this.successMessage.classList.remove('show');
        this.successMessage.textContent = '';
    }

    /**
     * Exibe mensagem de sucesso
     */
    showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.classList.add('show');

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            this.clearSuccess();
        }, 3000);
    }

    /**
     * Trata o envio do formulário
     */
    handleSubmit(e) {
        e.preventDefault();
        this.clearSuccess();

        // Valida ambos os campos
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        // Salva email se "Lembrar de mim" está marcado
        if (this.rememberMe.checked) {
            this.saveEmail(this.emailInput.value);
        } else {
            this.clearEmail();
        }

        // Simula envio do formulário
        this.simulateLogin();
    }

    /**
     * Simula o processo de login
     */
    simulateLogin() {
        const button = this.form.querySelector('button');
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = 'Entrando...';

        // Simula requisição (2 segundos)
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;

            const email = this.emailInput.value;
            this.showSuccess(`Login realizado com sucesso! Bem-vindo, ${email}`);

            // Limpa o formulário
            setTimeout(() => {
                this.form.reset();
            }, 1500);
        }, 2000);
    }

    /**
     * Salva o email no localStorage
     */
    saveEmail(email) {
        try {
            localStorage.setItem('savedEmail', email);
        } catch (error) {
            console.warn('Não foi possível salvar o email:', error);
        }
    }

    /**
     * Carrega o email salvo no localStorage
     */
    loadSavedEmail() {
        try {
            const savedEmail = localStorage.getItem('savedEmail');
            if (savedEmail) {
                this.emailInput.value = savedEmail;
                this.rememberMe.checked = true;
            }
        } catch (error) {
            console.warn('Não foi possível carregar o email:', error);
        }
    }

    /**
     * Limpa o email salvo
     */
    clearEmail() {
        try {
            localStorage.removeItem('savedEmail');
        } catch (error) {
            console.warn('Não foi possível limpar o email:', error);
        }
    }
}

// Inicializa o validador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new LoginValidator();
});
