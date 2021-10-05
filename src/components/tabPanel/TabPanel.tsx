import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@material-ui/core';
import { Chart, Pagination } from '..'
import { RootState } from '../../store';
import './TabPanel.scss';

type GridColumn = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridRow = 'auto' | 1 | 2;

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  grid: {
    column: GridColumn;
    row: GridRow;
  };
}

function usePagination<T extends any[]>(active: number, itemsOnPage: number, data: T): [number, string[]] {
  const [renderItmes, setRenderItmes] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    if (!!data.length) {
      const renderItmes = data.slice((active - 1) * itemsOnPage, active * itemsOnPage);
      const pages = Math.ceil(data.length / itemsOnPage);

      setRenderItmes(renderItmes);
      setPages(pages);
    }
  }, [active, data, itemsOnPage]);

  return [pages, renderItmes];
}

function useWindowSize() {
  const [size, setSize] = useState<number[]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function TabPanel(props: Props) {
  const { value, index, grid } = props;
  const { row, column } = grid;

  const countriesData = useSelector((state: RootState) => state.countries.countries);
  const element = useRef<HTMLDivElement>(null);
  const xsGrid = useRef<GridColumn>(4);
  const [height, setHeight] = useState<number | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    const countries = Object.keys(countriesData);
    setCountries(countries);
  }, [countriesData])

  const [widthWindow, heightWindow] = useWindowSize();

  useEffect(() => {
    const { width, height } = element?.current?.getBoundingClientRect() || {};
    if (row === 'auto' || column === 'auto') {
      const defaultSize = 350;
      const xsGridList: GridColumn[] = [12, 6, 4];
      const index = !!widthWindow ? Math.floor(widthWindow / defaultSize) - 1 : 0;
      xsGrid.current = xsGridList[index];
      setHeight(350);
    } else {
      const _width = !!width ? Math.floor(width / column) : width;
      const _height = !!height ? Math.floor((height - 50) / row) : height;

      if (!!_width && !!_height) {
        setHeight(Math.min(_height, _width));
      }
    }
  }, [row, column, widthWindow, heightWindow, value]);

  let charsOnPage = countries.length;
  if (typeof column === 'number' && typeof row === 'number') {
    charsOnPage = column * row;
  }

  const [pages, renderCountries] = usePagination<string[]>(activePage, charsOnPage, countries)

  return (
    <>
      {value === index && (
        <Box
          id={`simple-tabpanel-${index}`}
          className='tab-panel'
          role='tabpanel'
          aria-labelledby={`simple-tab-${index}`}
          hidden={value !== index}
          ref={element}
        >
          <Grid className='tab-panel__charts' container spacing={2}>
            {renderCountries.map((country, index) => (
              <Grid className='tab-panel__chart' key={index} item xs={xsGrid.current}>
                {!!height && <Chart height={height} title={country} data={countriesData[country]} />}
              </Grid>
            ))}
          </Grid>

          {!!pages && pages > 1 &&
            <Box className='tab-panel__pagination'>
              <Pagination
                active={activePage}
                count={pages}
                onChange={(page) => setActivePage(page)}
              />
            </Box>}
        </Box>
      )}
    </>
  );
}
