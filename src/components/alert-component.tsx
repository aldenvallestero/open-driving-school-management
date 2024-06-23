function InfoAlert({ message }: any) {
  return (
    <div
      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span className="font-medium">Info alert!</span> {message}
    </div>
  );
}

function DangerAlert({ message }: any) {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Danger alert!</span> {message}
    </div>
  );
}

function SuccessAlert({ message }: any) {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Success alert!</span> {message}
    </div>
  );
}

function WarningAlert({ message }: any) {
  return (
    <div
      className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
      role="alert"
    >
      <span className="font-medium">Warning alert!</span> {message}
    </div>
  );
}

function DarkAlert({ message }: any) {
  return (
    <div
      className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
      role="alert"
    >
      <span className="font-medium">Dark alert!</span> {message}
    </div>
  );
}

export default function Alert(props: any) {
  const { message, type } = props;
  let result;
  switch (type?.toLowerCase()) {
    case "info":
      result = <InfoAlert message={message} />;
      break;
    case "danger":
      result = <DangerAlert message={message} />;
      break;
    case "success":
      result = <SuccessAlert message={message} />;
      break;
    case "warning":
      result = <WarningAlert message={message} />;
      break;
    default:
      result = <DarkAlert message={message} />;
      break;
  }

  return result;
}
