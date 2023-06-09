import React, { FC } from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  loading: boolean;
}
const Loading: FC<Props> = ({ loading }) => {
  return <ClipLoader loading={loading} size={12} />;
};

export default Loading;
