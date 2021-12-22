declare namespace peeling {
    export type ColorMap = string | string[]
    export interface PeelingProps {
        colorMap: ColorMap
        excludes?: string[]
    }
    const peeling: (props: PeelingProps) => any
}

declare function peeling(props: peeling.PeelingProps): any

export default peeling
