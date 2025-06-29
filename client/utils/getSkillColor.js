export const getSkillColor = (skill) => {
  switch (skill.toLowerCase()) {
    case "javascript":
      return "bg-yellow-100";
    case "typescript":
      return "bg-blue-100";
    case "react":
      return "bg-blue-100";
    case "vue.js":
    case "vue":
      return "bg-green-100";
    case "node.js":
    case "nodejs":
    case "node":
      return "bg-green-100";
    case "python":
      return "bg-blue-100";
    case "django":
      return "bg-emerald-100";
    case "php":
      return "bg-indigo-100";
    case "laravel":
      return "bg-red-100";
    case "ui/ux design":
      return "bg-pink-100";
    case "figma":
      return "bg-pink-100";
    case "photoshop":
      return "bg-rose-100";
    case "project management":
      return "bg-orange-100";
    case "sales":
      return "bg-yellow-100";
    case "devops":
      return "bg-gray-100";
    case "aws":
      return "bg-orange-100";
    case "sql":
      return "bg-indigo-100";
    case "mongodb":
      return "bg-green-100";
    case "customer service":
      return "bg-sky-100";
    case "other":
      return "bg-gray-300";
    default:
      return "bg-gray-200";
  }
};
