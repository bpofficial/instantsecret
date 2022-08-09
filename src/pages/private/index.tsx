export default function PrivateIndexPage() {
    return <></>;
}

export const getServerSideProps = async () => {
    return {
        redirect: {
            permanent: true,
            destination: "/links",
        },
    };
};
