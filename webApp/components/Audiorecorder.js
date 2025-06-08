class AudioRecorder extends EventTarget{
    #isRunning=false;
    #inputAudioDevice= null;
    #audioData = [];
    #audioURL = null
    #mediaStream=null;

    constructor(){
        super()
    }

    getMediaStream(){
        return this.#mediaStream;
    }

    getAudioData(){}

    getAudioURL(){
        return this.#audioURL;
    }

    async createMediaRecorder(){
        if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)){
        console.log("Api não suportada")
        window.alert("Api nao suportada")
        }
        try{
            const fluxoAudio = await navigator.mediaDevices.getUserMedia({audio:true})
            this.#mediaStream = fluxoAudio;
            const mediaRecorder = new MediaRecorder(fluxoAudio)

            mediaRecorder.ondataavailable=(e)=>{
                if (e.data.size > 0){
                    this.#audioData.push(e.data);
                }

            };

            mediaRecorder.onstop = (e) =>{
                const blob = new Blob(this.#audioData, {type:"audio/ogg; codecs=opus"})
                this.#audioURL = window.URL.createObjectURL(blob);
                this.#audioData = []

                this.dispatchEvent(new CustomEvent('stop', {
                    detail: {url: this.#audioURL, blob: blob}
                }));
            }

            this.#inputAudioDevice = mediaRecorder
            this.dispatchEvent(new CustomEvent('ready'))
            
        }catch(error){
            this.dispatchEvent(new CustomEvent('error', {detail: error.message}))
        }
    }

    startAudioRecorder(){
        if (!this.#inputAudioDevice){
            window.alert("Não há Microfone")
            return;
        }
        if (this.#isRunning){
            window.alert("Gravação em andamento")
            return;
        }
        this.resetAudioRecorder();
        this.#isRunning = true
        this.#inputAudioDevice.start()
        this.dispatchEvent(new CustomEvent('start'))
    }
    
    stopAudioRecorder(){
        if(!this.#isRunning || !this.#inputAudioDevice){
            window.alert("Não há gravação em andamento")
            return ;
        }
        this.#isRunning = false
        this.#inputAudioDevice.stop()
    }
    pauseAudioRecorder(){
        if(this.#isRunning && this.#inputAudioDevice){
            this.#isRunning = false
            this.#inputAudioDevice.pause()
        }
        else{
            return;
        }
    }
    resumeAudioRecorder(){
        if(!this.#isRunning && this.#inputAudioDevice){
            this.#isRunning= true;
            this.#inputAudioDevice.resume();
        }
        else{return;}
    }
    resetAudioRecorder(){
        this.#isRunning = false
        this.#audioData =[]
        this.#audioURL = null
    }
    releaseMic(){
        if (this.#mediaStream){
            this.#mediaStream.getTracks().forEach(track=>track.stop())}
        this.#inputAudioDevice = null
        this.#audioURL = null
        this.#isRunning = false
        console.log("Mic liberado")
    }
}