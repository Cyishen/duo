import { getCourses, getUserProgress } from "@/db/queries"
import List from "./list"

const CoursesPage = async () => {
  // 1.順序執行
  // const courses = await getCourses()
  // const userProgress = await getUserProgress()

  // 2.同時執行, 節省時間, 提高性能？
  const coursesData = getCourses();
  const userProgressData = getUserProgress();
  
  const [ 
    courses, 
    userProgress, 
  ] = await Promise.all([ 
    coursesData, 
    userProgressData, 
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        中文使用者的語言課程
      </h1>
      <List
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  )
}

export default CoursesPage