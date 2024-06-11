function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').outerHTML = data;
            addHamburgerListener(); // Add the listener after loading the header
        });
}

function addHamburgerListener() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();

    document.querySelectorAll('.accordion').forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.nextElementSibling;
            panel.classList.toggle('closed');
        });
    });

    function createProjectHTML(project, isDevelopment = false) {
        const title = project.getElementsByTagName("title")[0].textContent;
        const description = project.getElementsByTagName("description")[0].textContent;
        const technologies = project.getElementsByTagName("technologies")[0].textContent;
        const link = isDevelopment ? project.getElementsByTagName("link")[0].textContent : '';
        const role = !isDevelopment ? project.getElementsByTagName("role")[0].textContent : '';
        const challenges = !isDevelopment ? project.getElementsByTagName("challenges")[0].textContent : '';
        const results = !isDevelopment ? project.getElementsByTagName("results")[0].textContent : '';
        const screenshot1 = project.getElementsByTagName("screenshot1")[0]?.textContent || '';
        const screenshot2 = project.getElementsByTagName("screenshot2")[0]?.textContent || '';

        const accordionButton = document.createElement("button");
        accordionButton.className = "accordion active";
        accordionButton.innerText = title;

        let panelContent = `
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Technologies:</strong> ${technologies}</p>
        `;

        if (isDevelopment) {
            panelContent += `<p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>`;
        } else {
            panelContent += `
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Challenges:</strong> ${challenges}</p>
                <p><strong>Results:</strong> ${results}</p>
            `;
        }

        panelContent += `
            <div class="screenshot-container">
                ${screenshot1 ? `<img src="${screenshot1}" alt="Screenshot 1" class="screenshot">` : ''}
                ${screenshot2 ? `<img src="${screenshot2}" alt="Screenshot 2" class="screenshot">` : ''}
            </div>
        `;

        const panelDiv = document.createElement("div");
        panelDiv.className = "panel";
        panelDiv.style.display = "block";
        panelDiv.innerHTML = panelContent;

        accordionButton.addEventListener("click", function() {
            this.classList.toggle("active");
            if (panelDiv.style.display === "block") {
                panelDiv.style.display = "none";
            } else {
                panelDiv.style.display = "block";
            }
        });

        return { accordionButton, panelDiv };
    }

    function loadProjects(containerId, xmlPath, isDevelopment = false) {
        if (document.getElementById(containerId)) {
            fetch(xmlPath)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, "application/xml");
                    const projects = xmlDoc.getElementsByTagName("project");
                    const container = document.getElementById(containerId);

                    for (let project of projects) {
                        const { accordionButton, panelDiv } = createProjectHTML(project, isDevelopment);
                        container.appendChild(accordionButton);
                        container.appendChild(panelDiv);
                    }
                });
        }
    }

    loadProjects("projects-container", 'xml/projects.xml');
    loadProjects("development-container", 'xml/development.xml', true);
});
