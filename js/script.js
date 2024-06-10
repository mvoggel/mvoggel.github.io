function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').outerHTML = data;
        });
}
document.querySelectorAll('.accordion').forEach(header => {
    header.addEventListener('click', () => {
        const panel = header.nextElementSibling;
        panel.classList.toggle('closed');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", function() {
    loadHeader();

    if (document.getElementById("projects-container")) {
        fetch('xml/projects.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");
                const projects = xmlDoc.getElementsByTagName("project");
                const container = document.getElementById("projects-container");

                for (let project of projects) {
                    const title = project.getElementsByTagName("title")[0].textContent;
                    const role = project.getElementsByTagName("role")[0].textContent;
                    const description = project.getElementsByTagName("description")[0].textContent;
                    const challenges = project.getElementsByTagName("challenges")[0].textContent;
                    const solutions = project.getElementsByTagName("solutions")[0].textContent;
                    const technologies = project.getElementsByTagName("technologies")[0].textContent;
                    const results = project.getElementsByTagName("results")[0].textContent;

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
                        <p><strong>Solutions:</strong> ${solutions}</p>
                        <p><strong>Technologies:</strong> ${technologies}</p>
                        <p><strong>Results:</strong> ${results}</p>
                    `;

                    accordionButton.addEventListener("click", function() {
                        this.classList.toggle("active");
                        if (panelDiv.style.display === "block") {
                            panelDiv.style.display = "none";
                        } else {
                            panelDiv.style.display = "block";
                        }
                    });

                    container.appendChild(accordionButton);
                    container.appendChild(panelDiv);
                }
            });
    }

    if (document.getElementById("development-container")) {
        fetch('xml/development.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");
                const projects = xmlDoc.getElementsByTagName("project");
                const container = document.getElementById("development-container");

                for (let project of projects) {
                    const title = project.getElementsByTagName("title")[0].textContent;
                    const description = project.getElementsByTagName("description")[0].textContent;
                    const technologies = project.getElementsByTagName("technologies")[0].textContent;
                    const link = project.getElementsByTagName("link")[0].textContent;

                    const accordionButton = document.createElement("button");
                    accordionButton.className = "accordion active";
                    accordionButton.innerText = title;

                    const panelDiv = document.createElement("div");
                    panelDiv.className = "panel";
                    panelDiv.style.display = "block";
                    panelDiv.innerHTML = `
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Technologies:</strong> ${technologies}</p>
                        <p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>
                    `;

                    accordionButton.addEventListener("click", function() {
                        this.classList.toggle("active");
                        if (panelDiv.style.display === "block") {
                            panelDiv.style.display = "none";
                        } else {
                            panelDiv.style.display = "block";
                        }
                    });

                    container.appendChild(accordionButton);
                    container.appendChild(panelDiv);
                }
            });
    }
});
