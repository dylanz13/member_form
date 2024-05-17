document.addEventListener('DOMContentLoaded', () => {
    const initialMembers = JSON.parse(
        '[{' +
        '"name":"Dr. Gregory House",' +
        '"description":"Head of diagnostic medicine at the Princeton-Plainsboro Teaching Hospital",' +
        '"age":64,' +
        '"imageUrl":"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.howold.co%2Fuploads%2Fphoto%2F600x600%2F79%2Fhugh-laurie-5e9e11de80a72.jpg&f=1&nofb=1&ipt=20c9632629309c87ba78d28db16da759b203443df6741c163cf449158fd5ad5b&ipo=images", ' +
        '"hobby":"Playing Detective"' +
        '}]');
    const memberList = document.getElementById('member-list');
    const searchInput = document.getElementById('search');

    const renderMember = member => {
        const memberCard = document.createElement('li');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <button class="delete-member">&times;</button>
            <img src="${member.imageUrl}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            ${member.age ? `<p>Age: ${member.age}</p>` : ''}
            ${member.hobby ? `<p>Favorite Hobby: ${member.hobby}</p>` : ''}
        `;
        memberList.appendChild(memberCard);

        memberCard.querySelector('.delete-member').addEventListener('click', () => {
            memberCard.style.animation = 'fadeOut 0.5s ease';
            memberCard.addEventListener('animationend', () => {
                memberCard.remove();
            });
        });
    };

    initialMembers.forEach(renderMember);

    document.getElementById('add-member').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const age = document.getElementById('age').value;
        const imageUrl = document.getElementById('image-url').value;
        const hobby = document.getElementById('hobby').value;

        const requiredFields = [name, description, imageUrl];
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field) {
                isValid = false;
            }
        });

        if (isValid) {
            const newMember = { name, description, age: age || null, imageUrl, hobby: hobby || null };
            renderMember(newMember);
            document.getElementById('member-form').reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });

    document.getElementById('delete-all').addEventListener('click', () => {
        memberList.innerHTML = '';
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const memberCards = document.querySelectorAll('.member-card');
        memberCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
