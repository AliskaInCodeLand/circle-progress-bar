const strokeRadius = 0.15;
const radius = 100 / (2 + strokeRadius);
const length = Math.PI * 2 * radius;

function toPercent(value) {
    return `${value}%`;
}

function setProcess(value) {
    const percent = Math.max(0, Math.min(100, value));
    return toPercent(length - (length * percent) / 100);
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