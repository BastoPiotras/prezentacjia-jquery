$(document).ready(function() {
    // 1. Inicjalizacja DataTables
    const table = $('#contactTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pl.json' // Polska wersja
        }
    });

    // 2. Walidacja Formularza (jQuery Validate)
    $("#contactForm").validate({
        rules: {
            fullname: { required: true, minlength: 3 },
            email: { required: true, email: true },
            phone: { required: true, digits: true, minlength: 9 }
        },
        messages: {
            fullname: "Wpisz imię i nazwisko (min. 3 znaki)",
            email: "Podaj poprawny adres e-mail",
            phone: "Podaj poprawny numer telefonu (9 cyfr)"
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            
            // Pobieranie danych z pól
            const name = $("input[name='fullname']").val();
            const email = $("input[name='email']").val();
            const phone = $("input[name='phone']").val();

            // 3. Manipulacja DOM - Dodawanie wiersza do tabeli
            const rowNode = table.row.add([
                name,
                email,
                phone,
                '<button class="btn btn-danger btn-sm deleteRow">Usuń</button>'
            ]).draw(false).node();

            // 4. Efekty i Animacje - fadeIn dla nowego wiersza
            $(rowNode).hide().fadeIn(1000);

            // Czyszczenie formularza
            form.reset();
        }
    });

    // 5. Obsługa zdarzeń (Click) - Usuwanie wiersza
    $('#contactTable tbody').on('click', '.deleteRow', function() {
        const row = $(this).parents('tr');
        
        // 6. Animacja slideUp przed usunięciem
        row.fadeOut(500, function() {
            table.row(row).remove().draw();
        });
    });

    // 7. Zmiana wyglądu (hover / css)
    $('#addBtn').hover(
        function() { $(this).css('transform', 'scale(1.05)'); },
        function() { $(this).css('transform', 'scale(1)'); }
    );
});
