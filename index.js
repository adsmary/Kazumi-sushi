// script.js - Interatividade e simulação de pedidos
document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const modal = document.getElementById('orderModal');
    const modalItemNameSpan = document.getElementById('modalItemName');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBtnContinue = document.querySelector('.modal-btn');

    // Função para abrir modal com nome do item
    function openModal(itemName) {
        if (modalItemNameSpan) {
            modalItemNameSpan.textContent = itemName;
        }
        modal.style.display = 'flex';
        // Pequeno timeout para garantir animação
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Adicionar eventos aos botões de pedido
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Captura o nome do item: pode vir do atributo data-item ou do h3 do card
            let itemName = btn.getAttribute('data-item');
            if (!itemName) {
                const card = btn.closest('.menu-card');
                const titleElem = card.querySelector('.card-info h3');
                if (titleElem) itemName = titleElem.innerText;
                else itemName = "Item especial";
            }
            openModal(itemName);
            
            // Efeito visual de clique (pequeno pulse)
            btn.style.transform = 'scale(0.96)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });

    // Fechar modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBtnContinue) modalBtnContinue.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Newsletter simples
    const submitNewsBtn = document.getElementById('submitNews');
    const newsInput = document.getElementById('newsEmail');
    if (submitNewsBtn) {
        submitNewsBtn.addEventListener('click', () => {
            const email = newsInput.value.trim();
            if (email && email.includes('@')) {
                alert(`Obrigado por se inscrever, ${email}! Você receberá novidades do Kazumi Sushi.`);
                newsInput.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }

    // Animação suave para links internos (âncora)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito de fade ao rolar (opcional: mostrar elementos)
    const revealElements = () => {
        const cards = document.querySelectorAll('.menu-card');
        const windowHeight = window.innerHeight;
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                if (!card.style.transition) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
                }
            }
        });
    };
    // definir estado inicial
    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
    });
    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    
    // Mensagem de boas-vindas no console para estilo
    console.log('Kazumi Sushi - Arte e sabor em cada pedaço');
});