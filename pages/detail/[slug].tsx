import BaseLayout from "<prefix>/layout/baseLayout";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Badge from "<prefix>/components/Badge";
type Item = {
    id: number;
    content: string;
    created_at: string;
    image_url: string;
    prompt: string;
    short_description: string;
    title: string;
};
interface IProps {
    list: Item
}
export default function Detail({ list }: IProps) {
    return <>
        <Head>
            <title>{list.title}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout>
            <div className="card-detail">
                <Image src={list.image_url} alt={list.title} width={1000} height={500}/>
                <div className="container">
                <Badge text={list.prompt}/>
                <h1>{list.title}</h1>
                <p>{list.content}</p>
                </div>
            </div>
        </BaseLayout>
    </>
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug } = context.query;
    const res = await fetch(`${process.env.CUSTOM_API_URL}/api`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${process.env.CUSTOM_API_TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    const data = await res.json();

    const filteredData = data.filter((item: Item) => item.id === Number(slug));
    if (!filteredData?.length) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            list: filteredData[0],
        },
    };
}