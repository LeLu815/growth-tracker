import Box from "@/components/Box"
import CategoryCountGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/CategoryCountGraph"
import SuccessRateGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/SuccessRateGraph"

function DetailGraph() {
  return (
    <Box className={"mt-[28px] flex flex-col gap-10"}>
      <div>
        <SuccessRateGraph />
      </div>
      <hr></hr>
      <div className={"mt-10"}>
        <CategoryCountGraph />
      </div>
    </Box>
  )
}

export default DetailGraph
