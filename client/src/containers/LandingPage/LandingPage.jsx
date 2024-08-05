import {
  Heading,
  Center,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export default function LandingPage() {

  return (
    <>
      <main>
        <Heading
        m={10}
          textAlign={"center"}
          fontSize={40}
          fontWeight={700}
          color={useColorModeValue("white", "gray.400")}
        >
          Welcome to "E Manager"
        </Heading>
        <Text m={10} fontSize={"larger"} textAlign={"center"}>
          An efficient employee and project management app streamlines
          operations by centralizing workforce data and project workflows. It
          empowers businesses to track employee performance, allocate resources
          effectively, and monitor project progress in real-time. By automating
          routine tasks and providing valuable insights, these platforms enhance
          collaboration, improve productivity, and ultimately drive
          organizational success.
        </Text>
        <Text m={10} fontSize={"larger"} textAlign={"center"}>
          An employee and project management app is a versatile tool that brings
          together workforce management and project execution. By consolidating
          employee information, task allocation, and project timelines,
          businesses gain a holistic view of their operations. These platforms
          facilitate efficient resource allocation, track progress, and foster
          collaboration among teams. With features like time tracking,
          performance metrics, and real-time updates, organizations can make
          data-driven decisions, enhance productivity, and ultimately achieve
          their project goals more effectively.
        </Text>
      </main>
    </>
  );
}
