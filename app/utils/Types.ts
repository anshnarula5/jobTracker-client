export interface Application {
    id?: number;
    jobId : string;
    companyName : string;
    jobLink : string;
    referralRequested?: boolean;
    referred?: boolean;
    applied?: boolean;
    referralRequestDate?: Date;
    referredDate?: Date;
    appliedDate?: Date;
    currentStatus? : any;
    currentStatusDate : Date
  }

  export interface ChartOptions {
    chart: {
      type: 'bar';
      height: number;
    };
    plotOptions: {
      bar: {
        borderRadius: number;
        horizontal: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    xaxis: {
      categories: any[];
    };
    responsive: {
      breakpoint: number;
      options: {
        chart: {
          type: 'bar';
          width: number;
        };
        legend: {
          position: string;
        };
      };
    }[];
  }
  