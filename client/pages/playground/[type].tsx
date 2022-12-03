import { GetServerSideProps, GetStaticProps, GetStaticPaths } from "next"
import CodeEditor from "../../src/components/CodeEditor"
import TerminalComponent from "../../src/components/Terminal/index"
import { axiosClient } from "../../src/utils/axiosClient"

type PlaygroundProps = {
    language: string
    containerId: string
}

export default function Playground({ language, containerId }: PlaygroundProps) {
    return (
        <section className="h-100vh">
            <section className='flex'>
                <CodeEditor language={language} />
                <iframe src=""></iframe>
            </section>
            <section className="h-40">
                <TerminalComponent containerId={containerId} />
            </section>
        </section>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const response = await axiosClient.post('/playground/', {type: 'NODE'})
 console.log("response ", response);
    return {
        props: {
            language: context.query.type,
            containerId: response.data.container.Id
        }
    }
}