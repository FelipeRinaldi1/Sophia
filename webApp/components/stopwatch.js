class Stopwatch{
    #timer=null;
    #startTime=0;
    #elapsedTime=0
    #isRunning=false;
    
    constructor(timeDisplayElement) {
        this.timeDisplayElement = timeDisplayElement;
    }
    getElapsedTime() {
        return this.#elapsedTime;
    }
    getIsRunning() {
        return this.#isRunning;
    }
    getDisplayElement() {
        return this.timeDisplayElement;
    }
    getStartTime() {
        return this.#startTime;
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
    calculateTime() {
        const totalSeconds = Math.floor(this.#elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    }

    updateDisplay(){
        const { hours, minutes, seconds } = this.calculateTime();
        this.timeDisplayElement.textContent = 
            `${this.formatUnit(hours)}:${this.formatUnit(minutes)}:${this.formatUnit(seconds)}`;
    }

    start(){
        if(this.#isRunning != true){
            this.#isRunning = true;
            this.#elapsedTime = 0;
            this.#startTime = Date.now() - this.#elapsedTime;
            this.#timer = setInterval(() => {
                this.#elapsedTime = Date.now() - this.#startTime;
                this.updateDisplay();
            }, 1000);
        }
    }
    pause(){
        if(this.#isRunning === true){
            this.#isRunning = false;
            clearInterval(this.#timer);
            this.#elapsedTime = Date.now() - this.#startTime;
            this.updateDisplay();
        }
    }
    resume(){
        if(this.#isRunning === false){
            this.#isRunning = true;
            this.#startTime = Date.now() - this.#elapsedTime;
            this.#timer = setInterval(() => {
                this.#elapsedTime = Date.now() - this.#startTime;
                this.updateDisplay();
            }, 1000);
        }
    }
    stop(){
        if(this.#isRunning === true){
            clearInterval(this.#timer);
            this.#elapsedTime = 0;
            this.updateDisplay();
            this.#isRunning = false;
        }
    }
    reset(){
        clearInterval(this.#timer)
        this.#elapsedTime = 0;
        this.updateDisplay();
        this.#isRunning = false;
    }
}

