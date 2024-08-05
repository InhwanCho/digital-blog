import { XAxis as RechartsXAxis, YAxis as RechartsYAxis, XAxisProps, YAxisProps } from 'recharts';

export const CustomXAxis = ({ ...props }: XAxisProps) => (
  <RechartsXAxis {...props} />
);

export const CustomYAxis = ({ ...props }: YAxisProps) => (
  <RechartsYAxis {...props} />
);
