$(document).ready(()=>{

    const formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
        }
       }

    $.getJSON('https://mindicador.cl/api', function(data) {
        
        const datos = data,
              dolar = datos.dolar.valor,
              euro = datos.euro.valor,
              bitcoin = datos.bitcoin.valor,
              imacec = datos.imacec.valor,
              uf = datos.uf.valor,
              ipc = datos.ipc.valor,
              utm = datos.utm.valor;
             
        const generar_valores = ()=>{

            $('#tipo-moneda').text('Dolar');
            $('#valor-moneda').text(formatNumber.new(dolar));
            
            setTimeout(()=>{
                $('#tipo-moneda').text('Euro');
                $('#valor-moneda').text(formatNumber.new(euro));
            }, 3000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text('Bitcoin');
                $('#valor-moneda').text(formatNumber.new(bitcoin));
            }, 6000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text('Imacec');
                $('#valor-moneda').text(formatNumber.new(imacec));
                $('#icono').removeClass('fas fa-dollar-sign').addClass('fas fa-percentage');
            }, 9000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text(datos.ipc.codigo.toUpperCase())
                $('#valor-moneda').text(formatNumber.new(ipc))
            }, 12000);
    
            setTimeout(()=>{
                $('#icono').addClass('fas fa-dollar-sign');
                $('#tipo-moneda').text(datos.uf.codigo.toUpperCase());
                $('#valor-moneda').text(formatNumber.new(uf));
                $('#icono').removeClass('fas fa-percentage').addClass('fas fa-dollar-sign');
            }, 15000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text(datos.utm.codigo.toUpperCase());
                $('#valor-moneda').text(formatNumber.new(utm));
            }, 18000);

        }

        generar_valores();

        setInterval(() => {

            generar_valores()

        }, 21000);


        $('#lupa').on('click', ()=>{
            
            $('#tabla').toggleClass('animate__animated animate__zoomIn mostrar');
            
        });

        $('#v_dolar').text(formatNumber.new(dolar));
        $('#v_euro').text(formatNumber.new(euro));
        $('#v_bitcoin').text(formatNumber.new(bitcoin));
        $('#v_imacec').text(formatNumber.new(imacec));
        $('#v_ipc').text(formatNumber.new(ipc));
        $('#v_uf').text(formatNumber.new(uf));
        $('#v_utm').text(formatNumber.new(utm));

    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    
})