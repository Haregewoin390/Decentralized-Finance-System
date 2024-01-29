import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Progress, Result, Typography } from "antd";
import { GlassCard } from "components/elements/cards";
import Modal from "components/elements/modal";
import { notification } from "components/elements/notification";
import { useUser } from "utils/context/user";
import { useNetwork } from "utils/context/network";
import { vote } from "utils/helpers/dao";
import { VoteProp } from "./type";

import styles from "./vote.module.scss";

const { Title, Text } = Typography;

export default function Vote({
  proposal,
  open,
  onCancel,
}: VoteProp): JSX.Element {
  const router = useRouter();
  const { userInfo } = useUser();
  const { choosenNetwork, provider } = useNetwork();
  const [buttonLoading, setButtonLoading] = useState<boolean[]>([false, false]);
  const [voting, setVoting] = useState<boolean>(true);

  const onVote = (index: boolean) => {
    const work = async () => {
      if (index) {
        setButtonLoading([true, false]);
      } else {
        setButtonLoading([false, true]);
      }
      if (provider && userInfo?.priv) {
        const response = await vote(
          provider,
          userInfo?.priv,
          choosenNetwork.name as "Polygon" | "Local" | "Mumbai",
          proposal.index,
          index
        );
        if (response.success) {
          notification({
            message: "Successfully Voted",
            description: "Your voted is registered successfully",
            messageType: "success",
          });
          setVoting(false);
        } else {
          notification({
            message: "Error occured",
            description: "Your voted is not registered",
            messageType: "error",
          });
        }
      }

      setButtonLoading([false, false]);
    };
    work();
  };

  const onCancelModal = () => {
    setVoting(true);
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancelModal}>
      <div className={styles.container}>
        <GlassCard>
          {voting ? (
            <div>
              <Title level={4}>{"Proposal " + proposal.name}</Title>
              <div className={styles.status}>
                <Text strong>{proposal.status}</Text>
                <Text strong>{proposal.endDate}</Text>
              </div>
              <div className={styles.votes}>
                <Button
                  className={`${styles.voteCount} ${styles.voteFor}`}
                  disabled={
                    proposal.status != "Ongoing" ||
                    buttonLoading[1] ||
                    proposal.vote == "Voted"
                  }
                  loading={buttonLoading[0]}
                  onClick={() => onVote(true)}
                >
                  <Text>{"For\t" + " "} </Text>
                  <Text>{proposal.voteFor}</Text>
                </Button>

                <Button
                  className={`${styles.voteCount} ${styles.voteAganist}`}
                  disabled={
                    proposal.status != "Ongoing" ||
                    buttonLoading[0] ||
                    proposal.vote == "Voted"
                  }
                  loading={buttonLoading[1]}
                  onClick={() => onVote(false)}
                >
                  <Text>{"Against " + " "}</Text>
                  <Text>{proposal.voteAgainst}</Text>
                </Button>
              </div>
              <Progress
                percent={100}
                success={{
                  percent:
                    proposal.voteAgainst == 0 && proposal.voteFor == 0
                      ? 50
                      : (proposal.voteFor * 100) /
                        (proposal.voteAgainst + proposal.voteFor),
                }}
                type="line"
                showInfo={false}
              />

              <Divider />
              <div>
                <Text>{proposal.description}</Text>
              </div>
            </div>
          ) : (
            <Result
              status="success"
              title="Your voted was registered successfully"
              extra={
                <Button
                  type="primary"
                  key="console"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Go to Dashboard
                </Button>
              }
            />
          )}
        </GlassCard>
      </div>
    </Modal>
  );
}
