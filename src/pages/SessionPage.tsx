import CLayout from "components/CLayout";
import AxiosClient, { fetcher } from "fetchers/client";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import rrwebPlayer from "rrweb-player";
import styled from "styled-components";
import { message } from "antd";

function SessionPage() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    AxiosClient.get(`/api/sessions/${id}/recordings`).then(({ data }) => {
      const recordings = data;

      console.log({ recordings });
      if (recordings.length < 2) {
        message.info("사용자의 활동이 너무 적어 표시할 수 없습니다");
      } else {
        new rrwebPlayer({
          target: document.getElementById("player"),
          props: {
            events: recordings,
          },
        });
      }
    });
  }, []);
  return (
    <CLayout asynchronous ready={true}>
      <Center>
        <div id="player"></div>
      </Center>
    </CLayout>
  );
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default SessionPage;
