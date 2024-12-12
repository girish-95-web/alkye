import Head from "next/head";
import BaseLayout from "<prefix>/layout/baseLayout";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from "next/link";
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
  data: Item[];
}

const Home = ({ data }: IProps) => (
  <>
    <Head>
      <title>Home</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <BaseLayout>
      <div className="home">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.1}
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          loop
          breakpoints={{
            768: {
              slidesPerView: 1.5,
              spaceBetween: 40,
            },
          }}
        >
          {data.map(({ id, image_url, prompt, short_description }) => (
            <SwiperSlide key={id}>
              <Link href={`/detail/${id}`}>
              <div className="slide-card" style={{ backgroundImage: `url(${image_url})` }}>
                <Badge text={prompt}/>
                <p>{short_description}</p>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </BaseLayout>
  </>
);

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.CUSTOM_API_URL}/api`, {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.CUSTOM_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch{
    return { notFound: true };
  }
}

export default Home;
