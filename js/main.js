(function () {
    'use strict';

    const FLAGS = {
        sverige: '<div class="part1"></div><div class="part2"></div></div>',
        elfenbenskusten: '<div class="part1"></div><div class="part2"></div></div>',
        grönland: '<div class="part1"></div><div class="part2">' +
            '</div><div class="part3"></div></div>',
        sydafrika: '<div class="part1">' +
            '</div><div class="part2"></div><div class="part3">' +
            '</div><div class="part4"></div><div class="part5"></div><div class="part6">' +
            '</div><div class="part7"></div><div class="part8"></div>' +
            '<div class="part9"></div></div>',
        frankrike: '<div class="part1"></div>' + '<div class="part2"></div></div>'
    };

    function makeDivWithClass(className) {
        const div = document.createElement("div");

        div.className = className;
        return div;
    }

    function makeFlag(name) {
        const flag = makeDivWithClass('flag ' + name);

        flag.innerHTML = FLAGS[name];
        return flag;
    }

    function makeCard(flag) {
        const card = makeDivWithClass('card');
        const wrapper = makeDivWithClass('wrapper');
        const back = makeDivWithClass('side back');
        const front = makeDivWithClass('side front');

        front.appendChild(makeFlag(flag));
        wrapper.appendChild(front);
        wrapper.appendChild(back);
        card.appendChild(wrapper);
        card.dataset.flagName = flag;
        return card;
    }

    const cardsContainer = document.getElementById("content");
    var allFlags = Object.keys(FLAGS).concat(Object.keys(FLAGS));

    function shuffle(array) {
        let i = array.length;

        while (i--) {
            const j = Math.floor(Math.random() * i);
            let temp = array[i];

            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    shuffle(allFlags);

    let clickedcard = null;
    let waiting = false;

    allFlags.forEach(function (flag) {
        let card = makeCard(flag);

        card.addEventListener('click', function () {
            if (!waiting) {
                card.classList.add('active');
                if (!clickedcard) {
                    clickedcard = card;
                } else {
                    if (card != clickedcard &&
                        clickedcard.dataset.flagName == card.dataset.flagName) {
                        card.classList.add('solved');
                        clickedcard.classList.add('solved');
                    }
                    waiting = true;
                    setTimeout(() => {
                        clickedcard.classList.remove('active');
                        card.classList.remove('active');
                        clickedcard = null;
                        waiting = false;
                    }, 1000);
                }
            }
        });
        cardsContainer.appendChild(card);
    });
    console.log('The excerise is ready!');
    console.log(allFlags);
    // cardsContainer.appendChild(makeCard('sverige'));
    // cardsContainer.appendChild(makeCard('grönland'));
})();
