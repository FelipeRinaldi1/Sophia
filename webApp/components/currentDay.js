class CurrentDate {
    #date = null;
    #weekDay = null;
    #month = null;
    #year = null;
    
    constructor(timeDisplayElement) {
        this.timeDisplayElement = timeDisplayElement;
    }

    static months = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    static weekDays = ["", "Domingo", "Segunda", "Terça", "Quarta",
        "Quinta", "Sexta", "Sábado"];
    
    //Nota: os valores obtidos com weekday e month são respectivamente de:
    // 0-6 e 0-11, para as semanas e meses.

    getDate() {
        this.checkNullDate();
        return this.#date;
    }

    setDate(newDate) {
        this.#date = newDate;
    }

    getWeekDay() {
        this.checkNullDate();
        return this.#weekDay;
    }

    setWeekDay(newWeekDay) {
        this.#weekDay = newWeekDay;
    }

    getMonth() {
        this.checkNullDate();
        return this.#month;
    }

    setMonth(newMonth) {
        this.#month = newMonth;
    }

    getYear() {
        this.checkNullDate();
        return this.#year;
    }

    setYear(newYear) {
        this.#year = newYear;
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

    checkNullDate() {
        if (this.#date === null || this.#month === null || this.#year === null || this.#weekDay === null) {
            this.updateDate();
        }
    }

    formatNumericDate() {
        this.checkNullDate();
        return `${this.formatUnit(this.#date)}/${this.formatUnit(this.#month + 1)}/${this.#year}`;
    }

    formatExtenseDate() {
        this.checkNullDate();

        const monthName = CurrentDate.months[this.#month + 1];
        const weekdayName = CurrentDate.weekDays[this.#weekDay + 1];

        return `${weekdayName}, ${this.formatUnit(this.#date)} de ${monthName} de ${this.#year}`;
    }

    updateDate() {
        let dateObj = new Date();
        this.#date = dateObj.getDate();
        this.#weekDay = dateObj.getDay();
        this.#month = dateObj.getMonth();
        this.#year = dateObj.getFullYear();
    }

    displayNumericDate() {
        if (this.timeDisplayElement) {
            this.timeDisplayElement.textContent = this.formatNumericDate();
        }
    }

    displayExtenseDate() {
        if (this.timeDisplayElement) {
            this.timeDisplayElement.textContent = this.formatExtenseDate();
        }
    }
}
