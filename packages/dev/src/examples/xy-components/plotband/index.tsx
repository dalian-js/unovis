import { ExampleViewerDurationProps } from '@src/components/ExampleViewer/index'
import { generateXYDataRecords, XYDataRecord } from '@src/utils/data'
import { VisAxis, VisCrosshair, VisLine, VisPlotband, VisTooltip, VisXYContainer } from '@unovis/react'
import { PlotbandLabelOrientation, PlotbandLabelPosition } from '@unovis/ts'
import React, { useRef, useState } from 'react'
import s from './style.module.css'

export const title = 'Plotband'
export const subTitle = 'Plot a band using the Plotband component'

const data = generateXYDataRecords(15)

export const component = (props: ExampleViewerDurationProps): React.ReactNode => {
  const tooltipRef = useRef(null)
  const accessors = [
    (d: XYDataRecord) => d.y,
    (d: XYDataRecord) => d.y1,
    (d: XYDataRecord) => d.y2,
    () => Math.random(),
    () => Math.random(),
  ]
  const axis = ['x', 'y']

  const textOrientation: PlotbandLabelOrientation[] = [
    PlotbandLabelOrientation.Horizontal,
    PlotbandLabelOrientation.Vertical,
  ]
  const textPosition: PlotbandLabelPosition[] = [
    PlotbandLabelPosition.TopLeftOutside,
    PlotbandLabelPosition.TopLeftInside,
    PlotbandLabelPosition.TopInside,
    PlotbandLabelPosition.TopOutside,
    PlotbandLabelPosition.TopRightInside,
    PlotbandLabelPosition.TopRightOutside,
    PlotbandLabelPosition.RightInside,
    PlotbandLabelPosition.RightOutside,
    PlotbandLabelPosition.BottomRightInside,
    PlotbandLabelPosition.BottomRightOutside,
    PlotbandLabelPosition.BottomInside,
    PlotbandLabelPosition.BottomOutside,
    PlotbandLabelPosition.BottomLeftInside,
    PlotbandLabelPosition.BottomLeftOutside,
    PlotbandLabelPosition.LeftInside,
    PlotbandLabelPosition.LeftOutside,
  ]
  const [plotbandAxis, setPlotbandAxis] = useState(axis[1])
  const [plotbandFrom, setPlotbandFrom] = useState(2)
  const [plotbandTo, setPlotbandTo] = useState(3)
  const [plotbandColor, setPlotbandColor] = useState('#ff8400')
  const [plotbandColorAlpha, setPlotbandColorAlpha] = useState(0.2)

  const [plotbandText, setPlotbandText] = useState('x label')
  const [plotbandTextPosition, setPlotbandTextPosition] = useState(textPosition[0])
  const [plotbandTextOffsetX, setPlotbandTextOffsetX] = useState(14)
  const [plotbandTextOffsetY, setPlotbandTextOffsetY] = useState(14)
  const [plotbandTextOrientation, setPlotbandTextOrientation] = useState(textOrientation[1])
  const [plotbandLabelColor, setPlotbandLabelColor] = useState()
  const [plotbandLabelSize, setPlotbandLabelSize] = useState(12)

  function formPlotbandFinalColor (color: string | undefined, alpha: number): string | undefined {
    if (!color || !/^#?[0-9A-Fa-f]{6}$/.test(color)) return undefined

    const hex = color.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const finalColor = formPlotbandFinalColor(plotbandColor, plotbandColorAlpha)

  return (
    <>
      <div>
        <div>
          <h3>Plotband Props</h3>
          <div className={s.controls}>
            <label>
               Axis:
              <select
                value={axis.indexOf(plotbandAxis)}
                onChange={e => setPlotbandAxis(axis[Number(e.target.value)])}
              >
                {axis.map((o, i) => <option key={i} value={i}>{String(o)}</option>)}
              </select>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                Color ({plotbandColor}):
                <input
                  type='color'
                  value={plotbandColor ?? '#000000'}
                  onChange={e => setPlotbandColor(e.target.value)}
                />
                <button onClick={() => setPlotbandColor(undefined)}>Clear</button>
              </label>
              <label>
                Color Alpha ({plotbandColorAlpha})
                <input type='range' min={0} max={1} step="0.1" value={plotbandColorAlpha} onChange={e => setPlotbandColorAlpha(Number(e.target.value))}/>
              </label>
            </div>
            <label>
              From ({plotbandFrom}):
              <input type='range' min={1} max={5} value={plotbandFrom} onChange={e => setPlotbandFrom(Number(e.target.value))}/>
            </label>
            <label>
              To ({plotbandTo}):
              <input type='range' min={1} max={10} step="0.5" value={plotbandTo} onChange={e => setPlotbandTo(Number(e.target.value))}/>
            </label>
          </div>
        </div>
        <div>
          <h3>Label Props</h3>
          <div className={s.controls}>
            <label>
              Text:
              <input type='text' value={plotbandText} onChange={e => setPlotbandText(e.target.value)}/>
            </label>
            <label>
              Position:
              <select value={plotbandTextPosition} onChange={e => setPlotbandTextPosition(e.target.value)}>
                {textPosition.map((position, index) => (
                  <option key={index} value={position}>{position}</option>
                ))}
              </select>
            </label>
            <label>
              Offset X:
              <input type='range' min={0} max={50} value={plotbandTextOffsetX} onChange={e => setPlotbandTextOffsetX(Number(e.target.value))}/>
              ({plotbandTextOffsetX})
            </label>
            <label>
              Offset Y:
              <input type='range' min={0} max={50} value={plotbandTextOffsetY} onChange={e => setPlotbandTextOffsetY(Number(e.target.value))}/>
              ({plotbandTextOffsetY})
            </label>
            <label>
              Orientation:
              <select value={plotbandTextOrientation} onChange={e => setPlotbandTextOrientation(e.target.value)}>
                {textOrientation.map((position, index) => (
                  <option key={index} value={position}>{position}</option>
                ))}
              </select>
            </label>
            <label>
              Color ({plotbandLabelColor}):
              <input type='color' value={plotbandColor} onChange={e => setPlotbandLabelColor(e.target.value)}/>
              <button onClick={() => setPlotbandLabelColor(undefined)}>Clear</button>
            </label>
            <label>
              Label Size ({plotbandLabelSize}):
              <input type='range' min={10} max={20} value={plotbandLabelSize} onChange={e => setPlotbandLabelSize(Number(e.target.value))}/>
            </label>
          </div>
        </div>
      </div>
      <div>
        <VisXYContainer<XYDataRecord> data={data}>
          <VisPlotband
            axis={plotbandAxis}
            color={finalColor}
            from={plotbandFrom}
            to={plotbandTo}
            labelText={plotbandText}
            labelPosition={plotbandTextPosition}
            labelOffsetX={plotbandTextOffsetX}
            labelOffsetY={plotbandTextOffsetY}
            labelOrientation={plotbandTextOrientation}
            labelColor={plotbandLabelColor}
            labelSize={plotbandLabelSize}
          />
          <VisLine x={d => d.x} y={accessors} duration={props.duration}/>
          <VisAxis type='x' numTicks={15} tickFormat={(x: number) => `${x}`} duration={props.duration}/>
          <VisAxis type='y' tickFormat={(y: number) => `${y}`} duration={props.duration}/>
          <VisCrosshair template={(d: XYDataRecord) => `${d.x}`} />
          <VisTooltip ref={tooltipRef} />
        </VisXYContainer>
      </div>
    </>
  )
}
