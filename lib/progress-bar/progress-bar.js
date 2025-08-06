// class ProgressBar extends HTMLElement {
//     constructor() {
//         super();
//         // Создаём теневое дерево
//         this.attachShadow({ mode: 'open' });
//         this.shadowRoot.innerHTML = `
//   <style>
//     :host {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       font-family: 'Lucida Sans', sans-serif;
//       width: 100%;
//       height: 100%;
//     }

//     .container {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 20px;
//     }

//     .progress-wrapper {
//       position: relative;
//       width: 117px;
//       height: 117px;
//     }

//     svg {
//       width: 100%;
//       height: 100%;
//       transform: rotate(-90deg);
//       transform-origin: center;
//     }

//     circle {
//       fill: none;
//       stroke-width: 10;
//       stroke-linecap: round;
//     }

//     .track {
//       stroke: #EAF0F6;
//     }

//     .fill {
//       stroke: #1A6CFF;
//       transition: stroke-dashoffset 0.3s ease;
//     }

//     .controls {
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//       font-weight: bold;
//       font-size: 14px;
//     }

//     .control {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//     }

//     input[type="number"] {
//       width: 40px;
//       height: 24px;
//       text-align: center;
//       border: 2px solid #000;
//       border-radius: 22px;
//       outline: none;
//       font-weight: bold;
//     }

//     .toggle {
//       opacity: 0;
//       position: absolute;
//     }

//     .toggle-check {
//       width: 40px;
//       height: 24px;
//       background-color: #DAE6EC;
//       border-radius: 12px;
//       position: relative;
//       cursor: pointer;
//     }

//     .toggle-check::before {
//       content: '';
//       position: absolute;
//       top: 3px;
//       left: 3px;
//       width: 18px;
//       height: 18px;
//       background: white;
//       border-radius: 50%;
//       transition: transform 0.3s;
//     }

//     .toggle:checked + .toggle-check {
//       background-color: #1A6CFF;
//     }

//     .toggle:checked + .toggle-check::before {
//       transform: translateX(16px);
//     }

//     .hidden {
//       opacity: 0;
//       pointer-events: none;
//     }

//     @media (max-width: 608px) and (orientation: portrait) {
//       .container {
//         flex-direction: column;
//       }
//       .progress-wrapper {
//         order: -1;
//         margin-bottom: 20px;
//       }
//     }
//   </style>

//   <div class="container">
//     <div class="progress-wrapper">
//       <svg viewBox="0 0 160 160">
//         <circle class="track" cx="80" cy="80" r="68" />
//         <circle class="fill" cx="80" cy="80" r="68" />
//       </svg>
//     </div>

//     <div class="controls">
//       <div class="control">
//         <input type="number" id="value" min="0" max="100" value="0" />
//         <label for="value">Value</label>
//       </div>
//       <div class="control">
//         <input type="checkbox" id="animate" class="toggle" />
//         <label for="animate" class="toggle-check"></label>
//         <label for="animate">Animate</label>
//       </div>
//       <div class="control">
//         <input type="checkbox" id="hide" class="toggle" />
//         <label for="hide" class="toggle-check"></label>
//         <label for="hide">Hide</label>
//       </div>
//     </div>
//   </div>
// `;

//         // Ссылки на DOM-элементы внутри Shadow DOM
//         this._circle = this.shadowRoot.querySelector('.fill');
//         this._svg = this.shadowRoot.querySelector('svg');
//         this._container = this.shadowRoot.querySelector('.progress-wrapper');
//         this._valueInput = this.shadowRoot.getElementById('value');
//         this._animateToggle = this.shadowRoot.getElementById('animate');
//         this._hideToggle = this.shadowRoot.getElementById('hide');

//         // Вычисляем длину окружности
//         this._radius = this._circle.r.baseVal.value;
//         this._circumference = 2 * Math.PI * this._radius;

//         // Устанавливаем stroke-dasharray
//         this._circle.setAttribute('stroke-dasharray', this._circumference);
//         this._circle.setAttribute('stroke-dashoffset', this._circumference);

//         // Обновление прогресса при вводе
//         this._valueInput.addEventListener('input', (e) => {
//             const value = e.target.value;
//             const clamped = Math.max(0, Math.min(100, value));
//             e.target.value = clamped;
//             this.setValue(clamped);
//         });

//         // Анимация
//         this._animateToggle.addEventListener('change', (e) => {
//             this.setAnimated(e.target.checked);
//         });

//         // Скрытие
//         this._hideToggle.addEventListener('change', (e) => {
//             this.setHidden(e.target.checked);
//         });

        
//     }

//     setValue(value) {
//         const clamped = Math.max(0, Math.min(100, value));
//         const offset = this._circumference - (clamped / 100) * this._circumference;
//         this._circle.setAttribute('stroke-dashoffset', offset);
//         this._circle.setAttribute('stroke', clamped > 0 ? '#1A6CFF' : '#EAF0F6');
//     }

//     setAnimated(isAnimated) {
//         this._circle.style.transition = isAnimated ? 'stroke-dashoffset 0.3s ease' : 'none';
//     }

//     setHidden(isHidden) {
//         this._container.classList.toggle('hidden', isHidden);
//     }
// }

// customElements.define('progress-bar', ProgressBar)


// Эти константы должны соответствовать CSS
const strokeRadius = 0.15;
const radius = 100 / (2 + strokeRadius); // в %
const p = Math.PI * 2 * radius; // длина окружности в %

function toPercent(value) {
    return `${value}%`;
}

function setProcess(value) {
    const percent = Math.max(0, Math.min(100, value));
    return toPercent(p - (p * percent) / 100);
}

class ProgressBar {
    constructor() {
        this._value = 0;
        this._circle = null;
        this._container = null;
    }

    render() {

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('svg');


        const shadow = document.createElementNS(svg.namespaceURI, 'circle');
        shadow.classList.add('svg-shadow');
        shadow.setAttribute('cx', 0);
        shadow.setAttribute('cy', 0);
        shadow.setAttribute('r', toPercent(radius));

        // 3. Круг прогресса
        this._circle = document.createElementNS(svg.namespaceURI, 'circle');
        this._circle.classList.add('svg-track');
        this._circle.setAttribute('cx', 0);
        this._circle.setAttribute('cy', 0);
        this._circle.setAttribute('r', toPercent(radius));

        svg.appendChild(shadow);
        svg.appendChild(this._circle);

        this._container = document.createElement('div');
        this._container.classList.add('svg-container');
        this._container.appendChild(svg);

        this.setValue(0);

        return this._container;
    }

    setValue(value) {
        const clamped = Math.max(0, Math.min(100, value));
        this._value = clamped;

        if (this._circle) {
            this._circle.style.strokeDashoffset = setProcess(clamped);
            this._circle.style.stroke = clamped > 0 ? '#1A6CFF' : '#EAF0F6';
        }
    }

    setAnimated(isAnimated) {
        this._circle?.classList.toggle('svg-animating', isAnimated);
    }

    setHidden(isHidden) {
        if (this._container) {
            this._container.classList.toggle('svg-container-hidden', isHidden);
        }
    }
}