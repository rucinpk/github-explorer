import { Repository } from "../model/User";

interface Props {
  repository: Repository;
}

const RepositoryComponent: React.FC<Props> = ({ repository }: Props) => {
  return (
    <div className="bg-gray-300 p-3 flex flex-row gap-1 w-[99%] justify-between ">
      <div>
        <div className="text-lg font-bold">{repository.name}</div>
        <div>{repository.description}</div>
      </div>
      <div className="flex flex-row gap-2 font-bold">
        {repository.starsCount}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      </div>
    </div>
  );
};

export default RepositoryComponent;
