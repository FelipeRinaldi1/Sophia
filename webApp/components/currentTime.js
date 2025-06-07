class CurrentTime{
    #hours = null
    #minutes = null;
    #seconds = null;
    #milliseconds = null;
    constructor(timeDisplayElement) {
        this.timeDisplayElement = timeDisplayElement;
    }

    getHours() {
        this.checkNullTime();
        return this.#hours;
    }
    setHours(newHours) {
        this.#hours = newHours;
    }
    getMinutes() {
        this.checkNullTime();
        return this.#minutes;
    }
    setMinutes(newMinutes) {
        this.#minutes = newMinutes;
    }
    getSeconds() {
        this.checkNullTime();
        return this.#seconds;
    }
    setSeconds(newSeconds) {
        this.#seconds = newSeconds;
    }
    getMilliseconds() {
        this.checkNullTime();
        return this.#milliseconds;
    }
    setMilliseconds(newMilliseconds) {
        this.#milliseconds = newMilliseconds;
    }
    getDisplayElement() {
        return this.timeDisplayElement;
    }
    setDisplayElement(newElement) {
        this.timeDisplayElement = newElement;
    }

    formatUnit(unit) {
        if (unit <= 9) {
            return '0' + unit;
        }
        return String(unit);
    }
    checkNullTime(){
        if (this.#hours === null || this.#minutes === null || this.#seconds === null || this.#milliseconds === null) {
            this.updateTime();
        }
    }
    updateTime() {
        const now = new Date();
        this.#hours = now.getHours();
        this.#minutes = now.getMinutes();
        this.#seconds = now.getSeconds();
        this.#milliseconds = now.getMilliseconds();
    }
    formatTime(){
        this.checkNullTime();
        return `${this.formatUnit(this.#hours)}:${this.formatUnit(this.#minutes)}:${this.formatUnit(this.#seconds)}`;
    }
    displayTime(){
        this.checkNullTime();
        this.timeDisplayElement.textContent = this.formatTime();
    }
    displayRealTime(){
        this.updateTime();
        this.displayTime();
        setInterval(()=>{
            this.updateTime();
            this.displayTime();
        },1000)
    }
}