import { GetServerSidePropsContext } from "next";
import { API } from "aws-amplify";
import { CreateLinkForm, PageWrapper } from "../../components";
import { parseBody } from "../../utils/parseBody";

export default function LinkIndexPage() {
  return (
    <PageWrapper>
      <CreateLinkForm />
    </PageWrapper>
  );
}
