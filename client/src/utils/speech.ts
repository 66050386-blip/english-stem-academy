/**
 * Web Speech API Utilities for Audio Pronunciation (TTS) and Speech-to-Text (STT)
 */

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export interface ListenOptions {
  lang?: string;
  onResult: (transcription: string, isFinal?: boolean) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
}

let activeRecognition: any = null;

export const speech = {
  speak(text: string, options: SpeakOptions = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported by this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options.rate !== undefined ? options.rate : 1.0;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;

    if (options.onEnd) {
      utterance.onend = options.onEnd;
    }
    if (options.onError) {
      utterance.onerror = options.onError;
    }

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('US') || v.name.includes('Samantha'))
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  isRecognitionSupported(): boolean {
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  },

  listen(options: ListenOptions): boolean {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (options.onError) {
        options.onError('Web Speech API Speech Recognition not supported');
      }
      return false;
    }

    try {
      if (activeRecognition) {
        try {
          activeRecognition.stop();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = options.lang || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        let isFinal = false;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            isFinal = true;
          }
        }
        options.onResult(transcript, isFinal);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (options.onError) {
          options.onError(event.error);
        }
      };

      recognition.onend = () => {
        if (options.onEnd) {
          options.onEnd();
        }
      };

      recognition.start();
      activeRecognition = recognition;
      return true;
    } catch (err: any) {
      console.error('Failed to start speech recognition', err);
      if (options.onError) {
        options.onError(err);
      }
      return false;
    }
  },

  stopListening() {
    if (activeRecognition) {
      try {
        activeRecognition.stop();
      } catch (e) {}
      activeRecognition = null;
    }
  },
};

// Aliases for backwards compatibility
export const speakEnglish = (text: string, rate: number = 1.0) => speech.speak(text, { rate });
export const startSpeechRecognition = (handlers: {
  onResult: (text: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}) =>
  speech.listen({
    onResult: (t, isFinal) => {
      if (isFinal) handlers.onResult(t);
    },
    onError: handlers.onError,
    onEnd: handlers.onEnd,
  });
