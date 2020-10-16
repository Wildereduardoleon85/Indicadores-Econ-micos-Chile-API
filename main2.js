$(document).ready(()=>{

    const format = (string)=>{

        if(string.length > 3){

            const parte1 = string.substr(0, (string.length - 3));
            const parte2 = string.substr((string.length - 3), string.length )
        
            return(parte1 + '.' + parte2);
        }
    };

    const reemplazar = (str) =>{

        return str.replace('.', ',');
    }


    $.getJSON('https://mindicador.cl/api', function(data) {
        const datos = data;

        const generar_valores = ()=>{

            $('#tipo-moneda').text('Dolar');
            $('#valor-moneda').text(reemplazar(String(datos.dolar.valor)));
            
            setTimeout(()=>{
                $('#tipo-moneda').text('Euro');
                $('#valor-moneda').text(reemplazar(String(datos.euro.valor)));
            }, 3000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text('Bitcoin');
                $('#valor-moneda').text(reemplazar(String(datos.bitcoin.valor)));
            }, 6000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text('Imacec');
                $('#valor-moneda').text(reemplazar(String(datos.imacec.valor)));
                $('#icono').removeClass('fas fa-dollar-sign').addClass('fas fa-percentage');
            }, 9000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text(datos.ipc.codigo.toUpperCase())
                $('#valor-moneda').text(reemplazar(String(datos.ipc.valor)))
            }, 12000);
    
            setTimeout(()=>{
                $('#icono').addClass('fas fa-dollar-sign');
                $('#tipo-moneda').text(datos.uf.codigo.toUpperCase());
                $('#icono').removeClass('fas fa-percentage').addClass('fas fa-dollar-sign');
            }, 15000);
    
            setTimeout(()=>{
                $('#tipo-moneda').text(datos.utm.codigo.toUpperCase());
                $('#valor-moneda').text(reemplazar(String(datos.utm.valor)));
            }, 18000);

        }

        generar_valores();

        setInterval(() => {

            generar_valores()

        }, 21000);


        $('#lupa').on('click', ()=>{
            
            $('#tabla').toggleClass('animate__animated animate__zoomIn mostrar');
            
        });

        $('#v_dolar').text(reemplazar(String(datos.dolar.valor)));
        $('#v_euro').text(reemplazar(String(datos.euro.valor)));
        $('#v_bitcoin').text(reemplazar(String(datos.bitcoin.valor)));
        $('#v_imacec').text(reemplazar(String(datos.imacec.valor)));
        $('#v_ipc').text(reemplazar(String(datos.ipc.valor)));
        $('#v_uf').text(reemplazar(String(datos.uf.valor)));
        $('#v_utm').text(reemplazar(String(datos.utm.valor)));

      

    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    
})