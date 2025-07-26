document.getElementById('filterToggle').addEventListener('click', function () {
    const sidebar = document.getElementById('filterSidebar');
    const chevron = document.getElementById('filterChevron');

    // Toggle sidebar visibility
    sidebar.classList.toggle('hidden');

    // Rotate chevron icon
    chevron.classList.toggle('rotate-180');

    // Close when clicking outside on mobile
    if (!sidebar.classList.contains('hidden')) {
        document.addEventListener('click', function closeSidebar(e) {
            if (!sidebar.contains(e.target) && e.target.id !== 'filterToggle') {
                sidebar.classList.add('hidden');
                chevron.classList.remove('rotate-180');
                document.removeEventListener('click', closeSidebar);
            }
            function updateSummary() {
                let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                let shipping = 5; // default shipping fee
                let discount = 0;
                let tax = subtotal * 0.05; // 5% tax

                if (appliedPromo) {
                    const promo = promos[appliedPromo];
                    if (promo.type === "discount") {
                        discount = (promo.amount / 100) * subtotal;
                    } else if (promo.type === "shipping") {
                        shipping = 0;
                    }
                }

                const total = subtotal - discount + tax + shipping;

                document.getElementById("summary").innerHTML = `
    <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
    <p>Shipping: <strong>$${shipping.toFixed(2)}</strong></p>
    <p>Tax: <strong>$${tax.toFixed(2)}</strong></p>
    <p>Discount: <strong>-$${discount.toFixed(2)}</strong></p>
    <hr class="my-2">
    <p class="text-xl font-bold">Total: <strong>$${total.toFixed(2)}</strong></p>
    `;
            }

        });
    }
});