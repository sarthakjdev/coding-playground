import { useEffect } from "react";

interface terminalProps {
    containerId: string
}

export default function TerminalComponent({ containerId }: terminalProps): JSX.Element {
    useEffect(() => {
        const initTerminal = async () => {
            const { Terminal } = await import('xterm')
            const { WebLinksAddon } = await import("xterm-addon-web-links")
            const { AttachAddon } = await import("xterm-addon-attach")
            const { FitAddon } = await import("xterm-addon-fit")
            await require('xterm/css/xterm.css')
            if (document) {
                const terminal = new Terminal({ allowProposedApi: true, })
                terminal.loadAddon(new WebLinksAddon())
                const socket = new WebSocket(`ws://localhost:3002/v1.41/containers/${'c68b4dd54b9b'}/attach/ws?logs=true&stream=true`)
                const attachAddon = new AttachAddon(socket, { bidirectional: true })
                terminal.loadAddon(attachAddon)
                const fitAddon = new FitAddon();
                terminal.loadAddon(fitAddon);
                terminal.open(document.getElementById('terminal') as HTMLElement)

                socket.addEventListener('open', (data) => {
                    terminal.writeln('terminal is gettng connectedd .....')
                    console.log(data);
                })
                terminal.onKey(key => {
                    const char = key.domEvent.key;
                    if (char === "Enter") {
                        prompt();
                    } else if (char === "Backspace") {
                        terminal.write("\b \b");
                    } else {
                        terminal.write(char);
                    }
                });

                terminal.onData((data) => {
                    console.log("data ", data);

                })

                const prompt = () => {
                    var shellprompt = "$ ";
                    terminal.write("\r\n" + shellprompt);
                };
                terminal.writeln('hello ')
                fitAddon.fit();
            }
        }

        initTerminal()

    }, [])

    return (
        <section id="terminal" className="h-full w-full">

        </section>
    )

}