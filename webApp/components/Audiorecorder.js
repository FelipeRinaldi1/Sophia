class AudioRecorder{
    #isRunning=null;
    #inputAudioDevice= null;
    #audioData = [];
    constructor(){}



    async createMediaRecorder(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){

            fluxoAudio = await navigator.mediaDevices.getUserMedia({audio:true})
            .then((fluxoAudio)=>{
                this.#inputAudioDevice = new MediaRecorder(fluxoAudio)
                console.log("getUserMediaFuncionou")
                
                #inputAudioDevice.ondataavailable = (e) =>{
                    this.#audioData.push(e.data)
                }
            })

            .catch((error)=>{
                console.log(`GetuserMediaError: ${error}`)
            })
        }else{console.log("GetuserMedia nao é suportado")}
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
        this.#isRunning = true
        this.#inputAudioDevice.start()
    }
    
    stopAudioRecorder(){
        if(!this.#isRunning || !this.#inputAudioDevice){
            window.alert("Não há gravação em andamento")
            return ;
        }
        this.#isRunning = false
        this.#inputAudioDevice.stop()
        
    }
}