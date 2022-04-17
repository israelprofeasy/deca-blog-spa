export class PaginationMetaData{
    Page: number;
    PerPage: number;
    Total: number;
    TotalPages: number;
    private pageNumbers: number[] = []; 

    get PageDropDwonOptions() : number[]{
        this.pageNumbers = [];
        for(let i=1; i<=this.Total; i++){
            this.pageNumbers.push(i*5);
        }
        return this.pageNumbers;
    }
}