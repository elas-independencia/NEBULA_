/* ==========================================
   NEBULAB
   SCRIPT.JS
========================================== */


/* ==========================================
   MENU MOBILE
========================================== */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


if (menuButton) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("open");

    });

}


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });


/* ==========================================
   TIPO DE PERSONAGEM
========================================== */

const creatorOptions =
    document.querySelectorAll(
        ".creator-option"
    );


let characterType = "original";


creatorOptions.forEach(option => {

    option.addEventListener("click", () => {

        creatorOptions.forEach(item => {

            item.classList.remove("active");

        });

        option.classList.add("active");

        characterType =
            option.dataset.type;


        const name =
            document.getElementById("name");

        const description =
            document.getElementById(
                "description"
            );


        if (characterType === "existing") {

            name.placeholder =
                "Ex.: Hermione Granger...";

            description.placeholder =
                "Digite o nome do personagem, obra, detalhes da roupa e características que deseja recriar.";

        } else {

            name.placeholder =
                "Ex.: Luna, guerreira estelar...";

            description.placeholder =
                "Descreva roupa, cabelo, cores, acessórios, estilo, personalidade...";

        }

    });

});


/* ==========================================
   CRIAÇÃO DO PROJETO
========================================== */

const createProject =
    document.getElementById(
        "createProject"
    );


createProject.addEventListener(
    "click",
    () => {

        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const level =
            document
                .getElementById("level")
                .value;


        const budget =
            document
                .getElementById("creatorBudget")
                .value;


        if (!name || !description) {

            notify(
                "Preencha o nome e a descrição do personagem."
            );

            return;

        }


        const generated =
            document.getElementById(
                "generatedProject"
            );


        const generatedName =
            document.getElementById(
                "generatedName"
            );


        const generatedInfo =
            document.getElementById(
                "generatedInfo"
            );


        generatedName.textContent =
            name;


        const type =
            characterType === "original"
                ? "personagem original"
                : "personagem existente";


        generatedInfo.innerHTML = `

            Seu projeto de
            <strong>${type}</strong>
            foi iniciado.

            <br><br>

            🌱 Nível:
            <strong>${level}</strong>

            <br>

            💰 Orçamento:
            <strong>R$ ${Number(budget).toLocaleString(
                "pt-BR"
            )}</strong>

            <br><br>

            Próximas etapas:
            referências → materiais →
            técnicas → orçamento → construção.

        `;


        generated.classList.add("show");


        /* Salva o projeto no navegador */

        const project = {

            name: name,

            description: description,

            type: characterType,

            level: level,

            budget: budget,

            date:
                new Date()
                    .toLocaleDateString("pt-BR")

        };


        localStorage.setItem(
            "nebulabProject",
            JSON.stringify(project)
        );


        notify(
            "✨ Seu projeto foi criado e salvo!"
        );


        generated.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* ==========================================
   RECUPERAR PROJETO
========================================== */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const saved =
            localStorage.getItem(
                "nebulabProject"
            );


        if (!saved) return;


        try {

            const project =
                JSON.parse(saved);


            document.getElementById(
                "name"
            ).value =
                project.name || "";


            document.getElementById(
                "description"
            ).value =
                project.description || "";


            document.getElementById(
                "level"
            ).value =
                project.level || "Iniciante";


            document.getElementById(
                "creatorBudget"
            ).value =
                project.budget || "250";


        } catch (error) {

            console.log(
                "Erro ao carregar projeto."
            );

        }

    }
);


/* ==========================================
   CALCULADORA DE ORÇAMENTO
========================================== */

const calculate =
    document.getElementById(
        "calculate"
    );


calculate.addEventListener(
    "click",
    () => {

        const value =
            Number(
                document.getElementById(
                    "budgetValue"
                ).value
            );


        if (!value || value <= 0) {

            notify(
                "Digite um valor válido."
            );

            return;

        }


        /*
            Distribuição inicial sugerida.
        */

        const clothes =
            value * .30;

        const materials =
            value * .25;

        const wig =
            value * .15;

        const accessories =
            value * .15;

        const makeup =
            value * .10;

        const reserve =
            value * .05;


        const result =
            document.getElementById(
                "budgetResult"
            );


        result.innerHTML = `

            <strong>
                ✦ Divisão sugerida
            </strong>

            <br><br>

            👕 Roupa:
            R$ ${money(clothes)}

            <br>

            🧰 Materiais:
            R$ ${money(materials)}

            <br>

            💇 Wig:
            R$ ${money(wig)}

            <br>

            🎭 Acessórios:
            R$ ${money(accessories)}

            <br>

            💄 Caracterização:
            R$ ${money(makeup)}

            <br>

            ✦ Reserva:
            R$ ${money(reserve)}

        `;


        notify(
            "💰 Orçamento organizado!"
        );

    }
);


/* ==========================================
   FORMATA DINHEIRO
========================================== */

function money(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


/* ==========================================
   BUSCA
========================================== */

const searchButton =
    document.getElementById(
        "searchButton"
    );


searchButton.addEventListener(
    "click",
    searchCharacter
);


function searchCharacter() {

    const value =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .trim();


    if (!value) {

        notify(
            "Digite um personagem para pesquisar."
        );

        return;

    }


    notify(
        `🔎 Pesquisa preparada para "${value}".`
    );

}


document
    .getElementById("searchInput")
    .addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchCharacter();

            }

        }
    );


/* ==========================================
   BOTÕES DE PROJETO
========================================== */

document
    .querySelectorAll(".details")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                notify(
                    "🎭 A página detalhada desse personagem será adicionada à próxima versão."
                );

            }
        );

    });


/* ==========================================
   NOVA
========================================== */

const novaButton =
    document.getElementById(
        "novaButton"
    );


novaButton.addEventListener(
    "click",
    () => {

        notify(
            "✦ NOVA: Olá! Estou pronta para ajudar a transformar sua ideia em um projeto."
        );

    }
);


/* ==========================================
   NOTIFICAÇÕES
========================================== */

function notify(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    const text =
        document.getElementById(
            "notificationText"
        );


    text.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        window.nebulaNotification
    );


    window.nebulaNotification =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            4000
        );

}
