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

    function createProjectHTML(project) {
        const title = project.getElementsByTagName("title")[0].textContent;
        const role = project.getElementsByTagName("role")[0].textContent;
        const description = project.getElementsByTagName("description")[0].textContent;
        const challenges = project.getElementsByTagName("challenges")[0].textContent;
        const technologies = project.getElementsByTagName("technologies")[0].textContent;
        const results = project.getElementsByTagName("results")[0].textContent;
        const screenshot1 = project.getElementsByTagName("screenshot1")[0]?.textContent || '';
        const screenshot2 = project.getElementsByTagName("screenshot2")[0]?.textContent || '';

        const accordionButton = document.createElement("button");
        accordionButton.className = "accordion active";
        accordionButton.innerText = title;

        const panelDiv = document.createElement("div");
        panelDiv.className = "panel";
        panelDiv.style.display = "block";
        panelDiv.innerHTML = `
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Challenges:</strong> ${challenges}</p>
            <p><strong>Technologies:</strong> ${technologies}</p>
            <p><strong>Results:</strong> ${results}</p>
            <div class="screenshot-container">
                ${screenshot1 ? `<img src="${screenshot1}" alt="Screenshot 1" class="screenshot">` : ''}
                ${screenshot2 ? `<img src="${screenshot2}" alt="Screenshot 2" class="screenshot">` : ''}
            </div>
        `;

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

    function loadProjects(containerId, xmlPath) {
        if (document.getElementById(containerId)) {
            fetch(xmlPath)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, "application/xml");
                    const projects = xmlDoc.getElementsByTagName("project");
                    const container = document.getElementById(containerId);

                    for (let project of projects) {
                        const { accordionButton, panelDiv } = createProjectHTML(project);
                        container.appendChild(accordionButton);
                        container.appendChild(panelDiv);
                    }
                });
        }
    }

    loadProjects("projects-container", 'xml/projects.xml');
    loadProjects("development-container", 'xml/development.xml');
});
